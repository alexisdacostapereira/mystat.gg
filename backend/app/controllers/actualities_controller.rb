class ActualitiesController < ApplicationController
    def index
        user = User.find_by(authentication_token: request.headers["API"])
        if user
            if user.actualities
                allactus = ActualitiesScraping::GetActuality.call(user.actualities)
                if allactus.length == 0
                    render :json => {error: "No Actus founded..."}, status: 400 
                    return
                end
                render :json => allactus, status: 200
            else
                render :json => {error: "Select A Game."}, status: 400 
            end
        else
            render :json => {error: "Invalid Token."}, status: 400 
        end
    end

    def index_of
        begin
            user = User.find_by(authentication_token: request.headers["API"])
            if user
                if user.actualities
                    number = params["page"].to_i * 5
                    allactus = ActualitiesScraping::GetActuality.call(user.actualities).first(number)
                    if allactus.length == 0
                        render :json => {error: "No Actus founded..."}, status: 400 
                        return
                    end        
                    render :json => allactus, status: 200
                else
                    render :json => {error: "Select A Game."}, status: 400 
                end
            else
                render :json => {error: "Invalid Token."}, status: 400 
            end
        rescue ActiveRecord::RecordNotFound
            render :json => {error: "Can't Connect to the Database."}, status: 400
        end
    end

    def change_preferences
        begin
            user = User.find_by(authentication_token: request.headers["API"])
            if user
                actu = user.actualities
                if (actu)
                    for elem in params.except("controller", "action")
                        actu[elem[0]] = elem[1]
                    end
                    actu.save
                    render :json => {success: "Preference Saved."}, status: 200 
                else 
                    newactu = Actualities.create()
                    for elem in params
                        newactu.attributes[elem[0]] = elem[1]
                    end
                    user.actualities = newactu
                    user.save    
                    render :json => {success: "Preference Created."}, status: 200 
                end
            else
                render :json => {error: "Invalid Token."}, status: 400 
            end
        rescue ActiveRecord::RecordNotFound
            render :json => {error: "Can't Connect to the Database."}, status: 400
        end
    end

    def get_preferences
        user = User.find_by(authentication_token: request.headers["API"])
        if user
            actu = user.actualities
            if (actu)
                data = {lolActu: actu.lolActu, valorantActu: actu.valorantActu, csGoActu: actu.csGoActu, apexActu: actu.apexActu, rocketLeagueActu: actu.rocketLeagueActu}
                render :json => {success: actu.attributes.except("id", "created_at", "updated_at")}, status: 200 
            else 
                newactu = Actualities.new
                render :json => {success: newactu.attributes.except("id", "created_at", "updated_at")}, status: 200 
            end
        else
            render :json => {error: "Invalid Token."}, status: 400 
        end
    end
end