require 'open-uri'
require "nokogiri"

class InstantGamingScraper::GetTrendingGames < ApplicationService
    def initialize(index)
        p "Get Trending Games From Instant Gaming..."
        @page = index
    end

    def call()
        doc = Nokogiri::HTML(URI.open("https://www.instant-gaming.com/fr/rechercher/?page=#{@page}"))
        array = []
        bad_img = []
        i = 0
        doc.css("div .item").each do |link|
            begin
                data = {}
                data["name"] = (link.text.gsub!(/.*?(?=¬)/im, "").gsub("\n", "").gsub("¬", "").strip).encode("iso-8859-1").force_encoding("utf-8")
                promo = link.text.gsub!(/.*?(?=-)/im, "").slice(0..(link.text.gsub!(/.*?(?=-)/im, "").index('%'))).strip
                promo.count("0-9") > 0 != false ? data["promo"] = promo : data["promo"] = "0%"
                data["price"] = link.text.gsub(/.*?(?=%\n)/im, "").slice(2..(link.text.gsub!(/.*?(?=%\n)/im, "").index('â') - 1)).strip
            rescue
                data["price"] = "6,66"
                array.push(data)
            else
                array.push(data)
            end
        end
        p array.length
        while i < array.length() do 
            array[i]["link"] =  doc.css("a.cover")[i]["href"];
            i += 1;
        end
        i = 0;
        while i < array.length() do 
            array[i]["imglink"] =  doc.css("img.picture")[i]["data-src"];
            i += 1;
        end
        p "#{array.length} objects inserted"
        for elem in array
            if (!Game.find_by({name: elem["name"], price: elem["price"]}) && elem["link"] && elem["imglink"])
                Game.create(elem);
            end
        end
        return array
    end    
end