class GamesController < ApplicationController
    def index
        begin
            user = User.find_by(authentication_token: request.headers["API"])

            if user
                @games = Game.all()
                render json: {success: @games}, status: 200
            else
                render :json => {error: "Invalid Token."}, status: 400 
            end
        rescue ActiveRecord::RecordNotFound
            render :json => {error: "Can't Connect to the Database."}, status: 400
        end
    end

    def index_of
        begin
            user = User.find_by(authentication_token: request.headers["API"])
            if user
                number = params["page"].to_i * 15
                @games = Game.first(number)
                render json: {success: @games}, status: 200
            else
                render :json => {error: "Invalid Token."}, status: 400 
            end
        rescue ActiveRecord::RecordNotFound
            render :json => {error: "Can't Connect to the Database."}, status: 400
        end
    end

    def get_specific_game
        begin
            unless (params[:name] && params[:min_price] && params[:max_price])
                render :json => {error: "Invalid Arguments"}, status: 400
                return
            end
            user = User.find_by(authentication_token: request.headers["API"])
            if user
                @games = Game.where("name LIKE ?", "%#{params[:name]}%").where('price > ?', params[:min_price]).where('price < ?', params[:max_price])
                if @games.length == 0
                    render json: {success: "Not Games For your Request !"}, status: 200
                else                  
                    render json: {success: @games}, status: 200
                end
            else
                render :json => {error: "Invalid Token."}, status: 400 
            end
        rescue ActiveRecord::RecordNotFound
            render :json => {error: "Can't Connect to the Database."}, status: 400
        end
    end

    def get_specific_game_index_of
        begin
            unless (params[:name] && params[:min_price] && params[:max_price])
                render :json => {error: "Invalid Arguments"}, status: 400
                return
            end
            user = User.find_by(authentication_token: request.headers["API"])
            if user
                @games = Game.where("name LIKE ?", "%#{params[:name]}%").where('price > ?', params[:min_price]).where('price < ?', params[:max_price])
                if @games.length == 0
                    render json: {success: "Not Games For your Request !"}, status: 200
                else                  
                    number = params["page"].to_i * 16
                    render json: {success: @games.first(number)}, status: 200
                end
            else
                render :json => {error: "Invalid Token."}, status: 400 
            end
        rescue ActiveRecord::RecordNotFound
            render :json => {error: "Can't Connect to the Database."}, status: 400
        end
    end
end
