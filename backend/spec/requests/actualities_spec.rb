require 'swagger_helper'

RSpec.describe 'actualities', type: :request do

  path '/actualities' do

    get('Get All Actualities') do
      tags "Actualities"
      description "Get all Prefered Actualities"
      parameter name: "API", in: :header, type: :string, required: true
      response(200, 'Successful') do
       
        examples 'application/json' => {
          "game": "League of Legends",
          "title": "LCS : Cloud9 battue par l'équipe académique de FlyQuest",
          "link": 'https://www.team-aaa.com/fr/actualite/lcs-cloud9-battue-par-lequipe-academique-de-flyquest_121233',
          "description": "Le nouveau cinq de départ de FlyQuest a fait sensation la nuit dernière en s'imposant contre les champions en titre de la ligue nord-américaine, Cloud9, lors de la 6e semaine des LCS Summer Split",
          "date": "10-07-2021 11:31:00"
        }
        run_test!
      end
      response(400, 'Bad Request') do
        examples 'application/json' => {
          "error": "Invalid Token.",
        }
        run_test!
      end
    end

    put('Change Preferences') do
      tags "Actualities"
      description "Put Parameter you want, all / only modified if you want, but respect variables names !"
      parameter name: "API", in: :header, type: :string, required: true
      consumes "application/json"
      parameter name: "object", in: :body, schema: {
        type: :object,
        properties: {
          lolActu: {type: :boolean},
          valorantActu: {type: :boolean},
          rocketLeagueActu: {type: :boolean},
          csGoActu: {type: :boolean},
          apexActu: {type: :boolean},
          callOfDutyActu: {type: :boolean},
          diablo2Actu: {type: :boolean},
          dota2Actu: {type: :boolean},
          dbzActu: {type: :boolean},
          fortniteActu: {type: :boolean},
          legendsOfRuneterraActu: {type: :boolean},
          marioKartActu: {type: :boolean},
          overwatchActu: {type: :boolean},
          pubgActu: {type: :boolean},
          rainbowSixActu: {type: :boolean},
          smashBrosUltimateActu: {type: :boolean},
          streetFighterVActu: {type: :boolean},
          starcraft2Actu: {type: :boolean},
          teamfightTacticsActu: {type: :boolean},
          tekken7Actu: {type: :boolean},
          trackmaniaActu: {type: :boolean},
          warcraft3Actu: {type: :boolean},
          wowActu: {type: :boolean},
        },
      }
      response(200, 'Successful') do
        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
      response(400, 'Bad Request') do
        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end

    
    path '/actualities/page=' do

      get('Get All Actualities with Pagination') do
        tags "Actualities"
        description "Get all Prefered Actualities with pagination, render 5 * Page selected"
        parameter name: "page", in: :parameter, type: :number, required: true
        parameter name: "API", in: :header, type: :string, required: true
        response(200, 'Successful') do
         
          examples 'application/json' => {
            "game": "League of Legends",
            "title": "LCS : Cloud9 battue par l'équipe académique de FlyQuest",
            "link": 'https://www.team-aaa.com/fr/actualite/lcs-cloud9-battue-par-lequipe-academique-de-flyquest_121233',
            "description": "Le nouveau cinq de départ de FlyQuest a fait sensation la nuit dernière en s'imposant contre les champions en titre de la ligue nord-américaine, Cloud9, lors de la 6e semaine des LCS Summer Split",
            "date": "10-07-2021 11:31:00"
          }
          run_test!
        end
        response(400, 'Bad Request') do
          examples 'application/json' => {
            "error": "Invalid Token.",
          }
          run_test!
        end
      end

    end

    path '/actualities/get_preferences' do

      get('Get All Preferences for Each Games') do
        tags "Actualities"
        description "Get all Preferences, return true or false for each games, if never preference selected before, return all games with false value"
        parameter name: "API", in: :header, type: :string, required: true
        response(200, 'Successful') do
          examples 'application/json' => {
          lolActu: :false,
          valorantActu: :false,
          rocketLeagueActu: :false,
          csGoActu: :false,
          apexActu: :false,
          callOfDutyActu: :false,
          diablo2Actu: :false,
          dota2Actu: :false,
          dbzActu: :false,
          fortniteActu: :false,
          legendsOfRuneterraActu: :false,
          marioKartActu: :false,
          overwatchActu: :false,
          pubgActu: :false,
          rainbowSixActu: :false,
          smashBrosUltimateActu: :false,
          streetFighterVActu: :false,
          starcraft2Actu: :false,
          teamfightTacticsActu: :false,
          tekken7Actu: :false,
          trackmaniaActu: :false,
          warcraft3Actu: :false,
          wowActu: :false
          }
          run_test!
        end
        response(400, 'Bad Request') do
          examples 'application/json' => {
            "error": "Invalid Token.",
          }
          run_test!
        end
      end

    end
  end
end
