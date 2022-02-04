
class UserController < ApplicationController
    def create
        begin
            if params[:pseudo].empty? || params[:email].empty? || params[:password].empty?
                render json: {error: 'Invalid Arguments.' }, status: 400
                return   
            end
            user = User.where(email: params[:email]).first
            if user
                render json: {error: 'User Already Exist.' }, status: 400
                return
            else
                newUser = User.create!(email: params[:email], password: params[:password], pseudo: params[:pseudo])
                newactu = Actualities.create()
                newUser.actualities = newactu
                newUser.save 
                render json: {success: newUser.authentication_token, pseudo: params[:pseudo]}, status: 200
            end
        rescue ActiveRecord::RecordNotFound
            render :json => {error: "Can't Connect to the Database."}, status: 400
        end
    end

    def login
        begin 
            unless params[:email] && params[:password]
                render json: {error: 'Invalid Arguments.' }, status: 400
                return   
            end

            user = User.where(email: params[:email]).first
            if user && user.valid_password?(params[:password])
                render json: {success: user.authentication_token, pseudo: user.pseudo}, status: 200
            else
                render :json => {error: "Email or Password Incorrect."}, status: 400
            end
        rescue ActiveRecord::RecordNotFound
            render :json => {error: "Can't Connect to the Database."}, status: 400
        end
    end

    def destroy
        begin
            user = User.find_by(authentication_token: request.headers["API"])
            if user
                user.authentication_token = nil
                user.save
                render json: {success: "User Disconnected."}, status: 200
            else
                render :json => {error: "Invalid Token."}, status: 400 
            end
        rescue ActiveRecord::RecordNotFound
            render :json => {error: "Can't Connect to the Database."}, status: 400
        end
    end


    def update_password
        begin
            user = User.find_by(authentication_token: request.headers["API"])
            if params[:password].empty?
                render json: {error: 'Invalid Arguments.' }, status: 400
                return   
            end
           if user.valid_password?(params[:password])
                render json: {error: 'Password cannot be the same :/' }, status: 400
                return
            else
                user.password = params[:password]
                user.save
                render json: {success: "Password Changed !"}, status: 200
            end
        rescue ActiveRecord::RecordNotFound
            render :json => {error: "Can't Connect to the Database."}, status: 400
        end
    end
end
