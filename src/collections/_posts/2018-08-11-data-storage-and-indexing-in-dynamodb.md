---
layout: post
title:  "Data Storage and Indexing in DynamoDB"
description: Building a deeper understanding of DynamoDB.
date:   2018-08-11 15:30:00+02:00
image: code
category: writing
body_id: blog
---


To power web-based applications, NoSQL databases can be a great and light-weight alternative to relational databases. The most significant difference to – say Postgres – is the way how data is stored, indexed and how it can be queried — all of this requires a different way of thinking about databases. I’ll explore how data storage, indexing, and querying works in [DynamoDB](https://aws.amazon.com/de/dynamodb/), one of AWS’ NoSQL offerings.

=====

## The Use Case

Imagine you are building an app that organises content into several projects, and each of these projects belongs to a specific organisation. The data model is straightforward:

1. An `organisations` table with the fields `id` and `name` .
2. A table `projects`with the fields`id`, `name`,  `organisation_id` for a reference to the project organisation, `owner` (the username of the person who runs the project) and `last_updated` showing when the project was last updated.

The app supports several use cases and queries the data  in several ways; for example:

- Get a single organisation.
- Get all projects that belong to a specific organisation.
- Get all of an organisation's projects that have been updated in the last seven days.
- Get all projects owned by a specific user.

In a relational database, we would put indexes on the fields we want to query, and the DBMS takes care of most of the heavy lifting for us. In DynamoDB you have to plan the queries upfront and prepare the indexes accordingly; and to write efficient queries and create useful indexes in DynamoDB requires an understanding it stores data.

## Partitions and Partition Keys — How DynamoDB Stores Data

DynamoDB splits each table into various partitions. Depending on its size, a dataset it is stored as a series of subsets of the whole data set. Partitioning is handled by DynamoDB internally; the number of partitions in your table depends on the size of your dataset as well as the read and write capacity you have defined. On which of the partitions a new record ends up, is defined by the _partition key_.  The _partition key_ is part of the primary key, which can take two different forms:

A simple primary key consists of one field, such as the ID of a record. The simple primary key becomes the partition key. In this case, the value for the partition key must be unique. In our organisations table, we would use the `id` as the primary key, which automatically makes it the partition key for the table.

The other option is a composite primary key, a composition of a partition key and a sort key. The partition key defines in which partition the record is stored, and the sort key defines the order of records within the partition. In composite primary keys, many records can share the same partition key, but the sort key must be unique. In our example, we wouldn’t have a case to use a composite primary key. We can, however, tweak the `projects` table slightly. If we know up front, that we mostly query projects grouped by organisation, then the primary key could consist of the `organisation_id` and the `name`; `organiziation_id` is the partition key and the sort key is `name`.

<table class="db">
    <caption>Partition A</caption>
    <thead>
        <tr>
            <th scope="col" class="pk">organisation_id</th>
            <th scope="col" class="sk">name</th>
            <th scope="col">owner</th>
            <th scope="col">last_updated</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="pk">abc123</td>
            <td class="sk">Foo Project</td>
            <td>jane</td>
            <td>2018-08-02</td>
        </tr>
        <tr>
            <td class="pk">abc123</td>
            <td class="sk">Other Foo Project</td>
            <td>john</td>
            <td>2018-03-02</td>
        </tr>
    </tbody>
</table>

<table class="db">
    <caption>Partition B</caption>
    <thead>
        <tr>
            <th scope="col" class="pk">organisation_id</th>
            <th scope="col" class="sk">name</th>
            <th scope="col">owner</th>
            <th scope="col">last_updated</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="pk">def456</td>
            <td class="sk">Bar Project</td>
            <td>jane</td>
            <td>2018-03-12</td>
        </tr>
        <tr>
            <td class="pk">def456</td>
            <td class="sk">Other Bar Project</td>
            <td>sarah</td>
            <td>2017-12-06</td>
        </tr>
    </tbody>
</table>

The tables show the `projects` data set. Our data set is split into two partitions; partition A contains all records where the `organisation_id` is `abc123` and partition B contains all record where the `organisation_id` is `def456`. Primary keys are indexed by default, which makes it easy to query an organisation using its `organisation_id` or to query all projects of an organisation. DynamoDB knows exactly in which partition a record can be found.

For other queries, DynamoDB would scan the _complete_ table and filter out the relevant records. The reason lies in partitioning — to find all projects owned by a specific user, DynamoDB has to look across all partitions to find relevant records, which has implications on query performance. To mitigate that, we need to add indexes on those fields; called _secondary indexes_ in DynamoDB.

## Secondary Indexes

Indexing a field as a secondary index creates a copy of the base table into a new table and new partitions. The indexed field becomes the alternative key (i.e., the primary key in the index table) and is either an alternative partition key or alternative sort key. Creating a whole new table seems counterintuitive at first, but DynamoDB is optimised towards data-retrieval performance and not to simplify data management. To keep index tables small, not all fields from the base table are projected (i.e., copied) to the index table. Only the base table’s primary key and the alternative key are projected, any additional fields that you want to transfer over to the index table must be specifically named when setting up a secondary index.

DynamoDB knows two types of secondary indexes: Local and global secondary indexes.

### Local secondary indexes

A local secondary index is used when you want to query a subset of records from a specific partition, but the records need to be ordered in a specific way to fulfil your query. In our example, retrieving all projects of an organisation that were updated in the last seven days would require a local secondary index on the `last_updated` field.

A local secondary index only changes the order inside a partition but not the partitioning itself. It uses the same partition key but a different sort key. Our projects table uses the `organisation_id` as the partition key and the `name` as the sort key. The corresponding local secondary index also uses the `organisation_id` as the partition key but the `last_updated` field as the sort key, allowing us to run queries against the `last_udpated` field without having to scan the whole data set. As depicted below, the partitioning is the same as the base table, but the order of records has changed according to the alternative sort key `last_updated`.

<table class="db">
    <caption>Partition A</caption>
    <thead>
        <tr>
            <th scope="col" class="pk">organisation_id</th>
            <th scope="col" class="sk">last_updated</th>
            <th scope="col">name</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="pk">abc123</td>
            <td class="sk">2018-03-02</td>
            <td>Other Foo Project</td>
        </tr>
        <tr>
            <td class="pk">abc123</td>
            <td class="sk">2018-08-02</td>
            <td>Foo Project</td>
        </tr>
    </tbody>
</table>

<table class="db">
    <caption>Partition B</caption>
    <thead>
        <tr>
            <th scope="col" class="pk">organisation_id</th>
            <th scope="col" class="sk">last_updated</th>
            <th scope="col">name</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="pk">def456</td>
            <td class="sk">2017-12-06</td>
            <td>Other Bar Project</td>
        </tr>
        <tr>
            <td class="pk">def456</td>
            <td class="sk">2018-03-12</td>
            <td>Bar Project</td>
        </tr>
    </tbody>
</table>

### Global secondary indexes

Global secondary indexes, on the other hand, change the partition where DynamoDB stores the record. If you want to query all projects that are owned by a specific user, then you need a global secondary index on the project table’s `owner` field. `owner` becomes the partition key for the index table.

<table class="db">
    <caption>Partition A</caption>
    <thead>
        <tr>
            <th scope="col" class="pk">owner</th>
            <th scope="col">organisation_id</th>
            <th scope="col">name</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="pk">jane</td>
            <td>abc123</td>
            <td>Foo Project</td>
        </tr>
        <tr>
            <td class="pk">jane</td>
            <td>def456</td>
            <td>Bar Project</td>
        </tr>
        <tr>
            <td class="pk">john</td>
            <td>abc123</td>
            <td>Other Foo Project</td>
        </tr>
    </tbody>
</table>

<table class="db">
    <caption>Partition B</caption>
    <thead>
        <tr>
            <th scope="col" class="pk">owner</th>
            <th scope="col">organisation_id</th>
            <th scope="col">name</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="pk">sarah</td>
            <td>def456</td>
            <td>Other Bar Project</td>
        </tr>
    </tbody>
</table>

Using `owner` as the partition key, the partitioning is changed. Partition A now contains three records whereas partition B contains only one. _Foo Project_ and _Bar Project_ used to be on separate partitions, now they on the same. By querying the index, we can now quickly find the all projects for a specific owner.

## Using Secondary Indexes to Query Data

Another important difference to relational databases is how we query data against indexed fields. In a relational database, you query the table, and the DBMS takes care of traversing the index and returning relevant records.

In DynamoDB, you query the index table directly. Remember not all fields are projected to the index, so the response can only contain the fields that are present in the index; if other fields need to be accessed, then another query to the base table is required. Knowing this is important when setting up an index.

When thinking about how data is stored, how indexes work, and how we query them in DynamoDB, it becomes clear that it is essential to think about how data is queried before designing a data model for DynamoDB. It’s up to the database admin to optimise the data model and its indexes towards reading performance, so it’s important to focus on a set of well-defined queries. If you don’t know how you will be querying your dataset in the long run, then you might be better off with a good old relational database.
