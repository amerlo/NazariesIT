require 'nokogiri'
require 'open-uri'

class PricingParserController < ApplicationController
  def index
    doc = Nokogiri::HTML(open("https://www.port-monitor.com/plans-and-pricing"))
    pricing = []
    
    doc.css("div.product").each do |product|
      monitors = product.at_css("h2").text
      check_rate = product.css("dl > dd")[0].text[/\d+/]
      history = product.css("dl > dd")[1].text[/\d+/]
      multiple_notifications = product.css("dl > dd")[2].text == 'Yes' ? true : false
      push_notifications = product.css("dl > dd")[3].text == 'Yes' ? true : false
      price = product.at_css("p > a.btn-large").text[/\d*\.\d*/]

      product_pricing = {
        monitors: monitors.to_i,
        check_rate: check_rate.to_i,
        history: history.to_i,
        multiple_notifications: multiple_notifications,
        push_notifications: push_notifications,
        price: price.to_f
      }

      pricing.push(product_pricing)
    end

    @pricingParsed = pricing.to_json
  end
end
