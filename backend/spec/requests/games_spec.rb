require 'swagger_helper'

RSpec.describe 'games', type: :request do

  path '/games' do
    get('Return all games') do
      tags "Games"
      description "Get all scraped Games From Instant Gaming"
      parameter name: "API", in: :header, type: :string, required: true
  
      response(200, 'Successful') do
        examples 'application/json' => [{
          "name": "Monster Hunter Stories 2: Wings of Ruin Deluxe Edition",
          "price": "46.79",
          "link": "https://www.instant-gaming.com/fr/8888-acheter-jeu-steam-monster-hunter-stories-2-wings-of-ruin-deluxe-edition/",
          "imglink": "https://s3.gaming-cdn.com/images/products/8888/271x377/monster-hunter-stories-2-wings-of-ruin-deluxe-edition-cover.jpg",
          "promo": "-34%"
          },
          {
            "name": "Chivalry 2",
            "price": "22.49",
            "link": "https://www.instant-gaming.com/fr/6076-acheter-jeu-epic-games-chivalry-2/",
            "imglink": "https://s2.gaming-cdn.com/images/products/6076/271x377/chivalry-2-cover.jpg",
            "promo": "-38%",
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

  path '/games/page=' do
    get('Return all games with pagination') do
      tags "Games"
      description "Get all scraped Games with pagination From Instant Gaming"
      parameter name: "page", in: :parameter, type: :number, required: true
      parameter name: "API", in: :header, type: :string, required: true
      
      response(200, 'Successful') do
        examples 'application/json' => [{
          "name": "Monster Hunter Stories 2: Wings of Ruin Deluxe Edition",
          "price": "46.79",
          "link": "https://www.instant-gaming.com/fr/8888-acheter-jeu-steam-monster-hunter-stories-2-wings-of-ruin-deluxe-edition/",
          "imglink": "https://s3.gaming-cdn.com/images/products/8888/271x377/monster-hunter-stories-2-wings-of-ruin-deluxe-edition-cover.jpg",
          "promo": "-34%"
          },
          {
            "name": "Chivalry 2",
            "price": "22.49",
            "link": "https://www.instant-gaming.com/fr/6076-acheter-jeu-epic-games-chivalry-2/",
            "imglink": "https://s2.gaming-cdn.com/images/products/6076/271x377/chivalry-2-cover.jpg",
            "promo": "-38%",
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

  path '/games' do
    post('get specific games') do
      tags "Games"
      parameter name: "API", in: :header, type: :string, required: true
      consumes "application/json"
      parameter name: :encounter, in: :body, schema: {
          type: :object,
          properties: {
            name: { type: :string },
            max_price: { type: :integer },
            min_price: { type: :integer },
          },
          required: ["email", "password"],
      }
      description "Return games from specifics Arguments"
        
      response(200, 'Successful') do
        examples 'application/json' => [{
          "name": "Monster Hunter Stories 2: Wings of Ruin Deluxe Edition",
          "price": "46.79",
          "link": "https://www.instant-gaming.com/fr/8888-acheter-jeu-steam-monster-hunter-stories-2-wings-of-ruin-deluxe-edition/",
          "imglink": "https://s3.gaming-cdn.com/images/products/8888/271x377/monster-hunter-stories-2-wings-of-ruin-deluxe-edition-cover.jpg",
          "promo": "-34%"
          },
          {
            "name": "Chivalry 2",
            "price": "22.49",
            "link": "https://www.instant-gaming.com/fr/6076-acheter-jeu-epic-games-chivalry-2/",
            "imglink": "https://s2.gaming-cdn.com/images/products/6076/271x377/chivalry-2-cover.jpg",
            "promo": "-38%",
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

  path '/games/page=' do
    post('get specific games with page') do
      tags "Games"
      
      parameter name: "page", in: :parameter, type: :number, required: true
      parameter name: "API", in: :header, type: :string, required: true
      consumes "application/json"
      parameter name: :encounter, in: :body, schema: {
          type: :object,
          properties: {
            name: { type: :string },
            max_price: { type: :integer },
            min_price: { type: :integer },
          },
          required: ["email", "password"],
      }
      description "Return games from specifics Arguments"
        
      response(200, 'Successful') do
        examples 'application/json' => [{
          "name": "Monster Hunter Stories 2: Wings of Ruin Deluxe Edition",
          "price": "46.79",
          "link": "https://www.instant-gaming.com/fr/8888-acheter-jeu-steam-monster-hunter-stories-2-wings-of-ruin-deluxe-edition/",
          "imglink": "https://s3.gaming-cdn.com/images/products/8888/271x377/monster-hunter-stories-2-wings-of-ruin-deluxe-edition-cover.jpg",
          "promo": "-34%"
          },
          {
            "name": "Chivalry 2",
            "price": "22.49",
            "link": "https://www.instant-gaming.com/fr/6076-acheter-jeu-epic-games-chivalry-2/",
            "imglink": "https://s2.gaming-cdn.com/images/products/6076/271x377/chivalry-2-cover.jpg",
            "promo": "-38%",
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
