require 'rss'
require 'open-uri'

class ActualitiesScraping::GetActuality < ApplicationService
    def initialize(actualities)
        p "Getting Actualities..."
        @elements = []
        actualities[:lolActu] ? @elements.push({url: "https://www.team-aaa.com/rss/game_lol.xml", img: "https://images8.alphacoders.com/406/thumb-1920-406809.jpg"}) : ""
        actualities[:valorantActu] ? @elements.push({url: "https://www.team-aaa.com/rss/game_VA.xml", img: "https://images6.alphacoders.com/107/thumb-1920-1072679.jpg"}) : ""
        actualities[:rocketLeagueActu] ? @elements.push({url: "https://www.team-aaa.com/rss/game_rl.xml", img: "https://rocketleague.media.zestyio.com/rl_platform_keyart_2019.309bf22bd29c2e411e9dd8eb07575bb1.jpg"}) : ""
        actualities[:csGoActu] ? @elements.push({url: "https://www.team-aaa.com/rss/game_csgo.xml", img: "https://i.pinimg.com/originals/e1/dd/1a/e1dd1a6063a73c920d8a442cceed97e8.jpg"}) : ""
        actualities[:apexActu] ? @elements.push({url: "https://www.team-aaa.com/rss/game_apex.xml", img: "https://images6.alphacoders.com/992/thumb-1920-992033.jpg"}) : ""
        actualities[:callOfDutyActu] ? @elements.push({url: "https://www.team-aaa.com/rss/game_cod.xml", img: "https://images3.alphacoders.com/101/thumb-1920-1018513.jpg"}) : ""
        actualities[:diablo2Actu] ? @elements.push({url: "https://www.team-aaa.com/rss/game_D2.xml", img: "https://www.journaldugeek.com/files/2016/09/DiabloII.jpg"}) : ""
        actualities[:dota2Actu] ? @elements.push({url: "https://www.team-aaa.com/rss/game_dota2.xml", img: "https://wallpaperaccess.com/full/5079511.jpg"}) : ""
        actualities[:dbzActu] ? @elements.push({url: "https://www.team-aaa.com/rss/game_dbfz.xml", img: "https://www.db-z.com/wp-content/uploads/2017/10/Dragon-Ball-FighterZ-mobile-wallpaper-fond-ecran-6.jp"}) : ""
        actualities[:fortniteActu] ? @elements.push({url: "https://www.team-aaa.com/rss/game_fortnite.xml", img: "https://www.tomshardware.fr/content/uploads/2018/03/cover-1.jpg"}) : ""
        actualities[:legendsOfRuneterraActu] ? @elements.push({url: "https://www.team-aaa.com/rss/game_lor.xml", img: "https://images.alphacoders.com/104/thumb-1920-1046456.jpg"}) : ""
        actualities[:marioKartActu] ? @elements.push({url: "https://www.team-aaa.com/rss/game_MK8.xml", img: "https://images7.alphacoders.com/821/thumb-1920-821837.jpg"}) : ""
        actualities[:overwatchActu] ? @elements.push({url: "https://www.team-aaa.com/rss/game_ow.xml", img: "https://www.wallpapertip.com/wmimgs/46-461656_overwatch-full-hd-wallpaper-hd-overwatch-backgrounds.jpg"}) : ""
        actualities[:pubgActu] ? @elements.push({url: "https://www.team-aaa.com/rss/game_pubg.xml", img: "https://wallpaperaccess.com/full/875246.jpg"}) : ""
        actualities[:rainbowSixActu] ? @elements.push({url: "https://www.team-aaa.com/rss/game_r6.xml", img: "https://images4.alphacoders.com/676/thumb-1920-676369.jpg"}) : ""
        actualities[:smashBrosUltimateActu] ? @elements.push({url: "https://www.team-aaa.com/rss/game_smash.xml", img: "https://images2.alphacoders.com/927/thumb-1920-927337.png"}) : ""
        actualities[:streetFighterVActu] ? @elements.push({url: "https://www.team-aaa.com/rss/game_sf5.xml", img: "https://images5.alphacoders.com/559/thumb-1920-559865.jpg"}) : ""
        actualities[:starcraft2Actu] ? @elements.push({url: "https://www.team-aaa.com/rss/game_sc2.xml", img: "https://images7.alphacoders.com/414/thumb-1920-414133.jpg"}) : ""
        actualities[:teamfightTacticsActu] ? @elements.push({url: "https://www.team-aaa.com/rss/game_tft.xml", img: " https://images8.alphacoders.com/111/1114293.jpg"}) : ""
        actualities[:tekken7Actu] ? @elements.push({url: "https://www.team-aaa.com/rss/game_tekken.xml", img: "https://www.spiritgamer.fr/wp-content/uploads/2019/08/Tekken-7-image-%C3%A0-la-une.png"}) : ""
        actualities[:trackmaniaActu] ? @elements.push({url: "https://www.team-aaa.com/rss/game_tmn2.xml", img: "https://www.actugaming.net/wp-content/uploads/2020/05/Trackmania.jpg"}) : ""
        actualities[:warcraft3Actu] ? @elements.push({url: "https://www.team-aaa.com/rss/game_wc3.xml", img: "https://www.jeuxcapt.com/wp-content/uploads/2020/02/reforged-human-wallpaper.jpg"}) : ""
        actualities[:wowActu] ? @elements.push({url: "https://www.team-aaa.com/rss/game_wow.xml", img: "https://i.pinimg.com/originals/d0/4e/b7/d04eb7e5e36bf01e8d663538e335016e.jpg"}) : ""
    end

    def call()
        data = []
        @elements.each do |elem|
            URI.open(elem[:url]) do |rss|
                feed = RSS::Parser.parse(rss)
                feed.items.each do |item|
                    hash = {}
                    hash["game"] = feed.channel.title
                    hash["title"] = item.title
                    hash["img"] = elem[:img]
                    hash["link"] = item.link
                    hash["description"] = item.description
                    hash["date"] = item.pubDate.strftime('%d-%m-%Y %T')
                    data.push(hash)
                end
            end
        end
        data.sort_by! { |hash| Time.parse(hash["date"])}
        return data.reverse
    end
end