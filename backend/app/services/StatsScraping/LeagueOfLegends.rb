require 'open-uri'
require "nokogiri"

def getTopChamps(topChamps)
    array = []
    topChamps.each do |item|
        data = {}
        data["name"] = item.css(".ChampionInfo").css(".ChampionName").text.gsub("\t", "").gsub("\n", "")
        data["cs"] = item.css(".ChampionInfo").css(".ChampionMinionKill").text.gsub("\t", "").gsub("\n", "").gsub("CS ", "")
        data["kda"] = item.css(".PersonalKDA").css(".KDA").text.gsub("\t", "").gsub("\n", "").partition("KDA")[0]
        data["kills"] = item.css(".PersonalKDA").css(".KDAEach").css(".Kill").text.gsub("\t", "").gsub("\n", "")
        data["deaths"] = item.css(".PersonalKDA").css(".KDAEach").css(".Death").text.gsub("\t", "").gsub("\n", "")
        data["assits"] = item.css(".PersonalKDA").css(".KDAEach").css(".Assist").text.gsub("\t", "").gsub("\n", "")
        data["win_ratio"] = item.css(".Played").css(".WinRatio").text.gsub("\t", "").gsub("\n", "")
        data["nb_game"] = item.css(".Played").css(".Title").text.gsub(" Played", "")
        array.push(data)
    end
    array
end

def getLastGames(lastGames)
    array = []
    lastGames.each do |item|
        data = {}
        data["type"] = item.css(".GameItem").css(".Content").css(".GameStats").css(".GameType").text.gsub("\t", "").gsub("\n", "")
        data["date"] = item.css(".GameItem").css(".Content").css(".GameStats").css(".TimeStamp").text.gsub("\t", "").gsub("\n", "")
        data["result"] = item.css(".GameItem").css(".Content").css(".GameStats").css(".GameResult").text.gsub("\t", "").gsub("\n", "")
        data["time"] =  item.css(".GameItem").css(".Content").css(".GameStats").css(".GameLength").text.gsub("\t", "").gsub("\n", "")
        data["champion"] = item.css(".GameItem").css(".Content").css(".GameSettingInfo").css(".ChampionName").text.gsub("\t", "").gsub("\n", "")
        data["kill"] = item.css(".GameItem").css(".Content").css(".KDA").css(".Kill")[0].text.gsub("\t", "").gsub("\n", "")
        data["death"] = item.css(".GameItem").css(".Content").css(".KDA").css(".Death").text.gsub("\t", "").gsub("\n", "")
        data["assist"] = item.css(".GameItem").css(".Content").css(".KDA").css(".Assist").text.gsub("\t", "").gsub("\n", "")
        data["kda"] = item.css(".GameItem").css(".Content").css(".KDARatio").css(".KDARatio").text.partition("KDA")[0].gsub("\t", "").gsub("\n", "")
        data["level"] = item.css(".GameItem").css(".Content").css(".Stats").css(".Level").text.gsub("\t", "").gsub("\n", "").gsub("Level", "")
        data["cs"] = item.css(".GameItem").css(".Content").css(".Stats").css(".CS").text.gsub("\t", "").gsub("\n", "").partition("CS")[0]
        array.push(data)
    end
    array
end

class StatsScraping::LeagueOfLegends < ApplicationService
    def initialize(url)
        p "Get Stats for League Of Legends Account..."
        @url = url
    end

    def call()
        doc = Nokogiri::HTML(URI.open(@url))
        all = {}

        all["pseudo"] = doc.css(".Name").text.gsub("?", "")
        all["rank"] = doc.css(".TierRank").text.gsub("\t", "").gsub("\n", "")
        all["LP"] = doc.css(".LeaguePoints").text.gsub("\t", "").gsub("\n", "")
        all["total_win"] = doc.css(".wins").text.gsub("W", "")
        all["total_lose"] = doc.css(".losses").text.gsub("L", "")
        all["total_games"] = all["total_win"].to_i + all["total_lose"].to_i
        all["ratio_win_lose"] = doc.css(".WinLose").css(".winratio").text.gsub("Win Ratio ", "")
        all["avg_kill"] = doc.css(".KDA").css(".Kill")[0].text
        all["avg_death"] = doc.css(".KDA").css(".Death")[0].text
        all["avg_assist"] = doc.css(".KDA").css(".Assist")[0].text
        all["avg_kill_contribution"] = doc.css(".CKRate").first.text.gsub("\t", "").gsub("\n", "")
        all["top_champions"] = getTopChamps(doc.css(".ChampionBox"))
        all["last_games"] = getLastGames(doc.css(".GameItemWrap"))
        all
    end
end