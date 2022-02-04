require 'swagger_helper'

RSpec.describe 'gaming_stats', type: :request do
  path '/stats/lol' do

    get('get Stats for Lol Player') do
      response(200, 'successful') do
        tags "Stats"
        description "Get Stats For League Of Legends Player"
        parameter name: "API", in: :header, type: :string, required: true
        consumes "application/json"
        parameter name: :encounter, in: :body, schema: {
          type: :object,
          properties: {
            server: { type: :string},
            pseudo: { type: :string },
          },
          required: ["email", "password"],
      }
        
        response(200, 'Successful') do
          examples 'application/json' => ["success": {
            "pseudo": "Faker",
            "rank": "Gold 2",
            "LP": "28 LP",
            "total_win": "12",
            "total_lose": "17",
            "total_games": 29,
            "ratio_win_lose": "41%",
            "avg_kill": "10.3",
            "avg_death": "8.9",
            "avg_assist": "18.8",
            "avg_kill_contribution": "(62%)",
            "top_champions": [
                {
                    "name": "Fiddlesticks",
                    "cs": "143.2 (4.8)",
                    "kda": "2.31:1",
                    "kills": "6.2",
                    "deaths": "6.9",
                    "assits": "9.7",
                    "win_ratio": "47%",
                    "nb_game": "15 Played"
                },
                {
                    "name": "Viego",
                    "cs": "150.9 (5.4)",
                    "kda": "2.00:1",
                    "kills": "5.9",
                    "deaths": "5.9",
                    "assits": "5.9",
                    "win_ratio": "50%",
                    "nb_game": "8 Played"
                }
            ],
            "last_games": [
                {
                    "type": "ARAM",
                    "date": "2021-06-30 08:59:05",
                    "result": "Victory",
                    "time": "22m 2s",
                    "champion": "Caitlyn",
                    "kill": "13",
                    "death": "11",
                    "assist": "32",
                    "kda": "4.09:1 ",
                    "level": "18",
                    "cs": "55 (2.5) "
                },
                {
                    "type": "ARAM",
                    "date": "2021-06-25 10:35:53",
                    "result": "Victory",
                    "time": "20m 51s",
                    "champion": "Shyvana",
                    "kill": "12",
                    "death": "9",
                    "assist": "23",
                    "kda": "3.89:1 ",
                    "level": "18",
                    "cs": "42 (2) "
                },
            ]
        }]
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
