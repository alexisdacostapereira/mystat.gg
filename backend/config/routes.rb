Rails.application.routes.draw do
  ## Rails Swagger (Api Documentation)
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  root :to => redirect('/api-docs')

  ## USERS
  post "/user/sign_up", to: "user#create"
  post "/user/sign_in", to: "user#login"
  post "/user/update_password", to: "user#update_password"
  delete "/user/disconnect", to: "user#destroy"

  ## ACTUALITIES
  get "/actualities", to: "actualities#index"
  get "/actualities/page=:page", to: "actualities#index_of"
  put "/actualities", to: "actualities#change_preferences"
  get "/actualities/get_preferences", to: "actualities#get_preferences"

  ## GAMES
  get "/games", to: "games#index"
  get "/games/page=:page", to: "games#index_of"
  post "/games", to: "games#get_specific_game"
  post "/games/page=:page", to: "games#get_specific_game_index_of"

  ## STATS
  
  get "/stats/apex" => "gaming_stats#getApexStats"
  get "/stats/csgo", to: "gaming_stats#getCsGoStats"
  get "/stats/rocketleague", to: "gaming_stats#getRocketLeagueStats"
  post "/stats/lol", to: "gaming_stats#getLolStats"
  get "/stats/valorant", to: "gaming_stats#getValorantStats"
# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
