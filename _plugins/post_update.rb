require 'kramdown'

module Jekyll
  class PostUpdate < Liquid::Block
    def render(context)
      text = "**Update:** #{super}"
      "<div class=\"update\">#{Kramdown::Document.new(text).to_html}</div>"
    end
  end
end

Liquid::Template.register_tag('post_update', Jekyll::PostUpdate)
