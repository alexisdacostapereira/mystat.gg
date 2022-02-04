require 'net/http'

class GamingStatsController < ApplicationController
    def getLolStats
        unless params[:pseudo]
            render json: {error: 'Invalid Arguments.' }, status: 400
            return   
        end
        user = User.find_by(authentication_token: request.headers["API"])
        if user
            stats = StatsScraping::LeagueOfLegends.call("https://#{params[:server]}.op.gg/summoner/userName=#{params[:pseudo]}")
            render json: {success: stats}, status: 200
        else 
            render :json => {error: "Invalid Token."}, status: 400 
        end
    end

    def getApexStats
        unless params[:server] && params[:pseudo]
            render json: {error: 'Invalid Arguments.' }, status: 400
            return   
        end
        user = User.find_by(authentication_token: request.headers["API"])
        if user
            stats = StatsScraping::LeagueOfLegends.call("https://tracker.gg/lol/profile/riot/EUW/PewNiett/overview")
            render json: {success: stats}, status: 200
        else 
            render :json => {error: "Invalid Token."}, status: 400 
        end
    end

    def getValorantStats
        unless params[:server] && params[:pseudo]
            render json: {error: 'Invalid Arguments.' }, status: 400
            return   
        end
        user = User.find_by(authentication_token: request.headers["API"])
        if user
            stats = StatsScraping::LeagueOfLegends.call("https://tracker.gg/lol/profile/riot/EUW/PewNiett/overview")
            render json: {success: stats}, status: 200
        else 
            render :json => {error: "Invalid Token."}, status: 400 
        end
    end

    def getRocketLeagueStats
        unless params[:server] && params[:pseudo]
            render json: {error: 'Invalid Arguments.' }, status: 400
            return   
        end
        user = User.find_by(authentication_token: request.headers["API"])
        if user
            stats = StatsScraping::LeagueOfLegends.call("https://tracker.gg/lol/profile/riot/EUW/PewNiett/overview")
            render json: {success: stats}, status: 200
        else 
            render :json => {error: "Invalid Token."}, status: 400 
        end
    end

    def getCsGoStats
        unless params[:server] && params[:pseudo]
            render json: {error: 'Invalid Arguments.' }, status: 400
            return   
        end
        user = User.find_by(authentication_token: request.headers["API"])
        if user
            stats = StatsScraping::LeagueOfLegends.call("https://tracker.gg/lol/profile/riot/EUW/PewNiett/overview")
            render json: {success: stats}, status: 200
        else 
            render :json => {error: "Invalid Token."}, status: 400 
        end
    end
end
