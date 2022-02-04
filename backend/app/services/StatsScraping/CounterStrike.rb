require 'open-uri'
require "nokogiri"

class StatsScraping::CounterStrike < ApplicationService
    def initialize(url)
        p "Get Stats for Counter Strike Account..."
        @url = url
    end

    def call()
        doc = Nokogiri::HTML(URI.open(@url))
        data = []
        p "------------------------"
        main =  doc.css("div .trn-grid .container")
        #p doc.css("div .summary__stats").text
        p doc.css("div .summary__champions").text
        return data
    end
end