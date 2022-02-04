require 'swagger_helper'

RSpec.describe 'user', type: :request do

  path '/user/sign_up' do

    post('Create a new User') do
      tags "Users"
      description "Register Route"
      consumes "application/json"
      parameter in: :body, schema: {
        type: :object,
        properties: {
          pseudo: { type: :string },
          email: { type: :string },
          password: { type: :string },
        },
        required: ["pseudo", "email", "password"],
      }
  
      response(200, 'Successful') do
        examples 'application/json' => {
          "success": "swr5ymxs92XzoXN8ohBG",
          "pseudo": "PewPew",
        }
        run_test!
      end

      response(400, 'Bad Request') do
        examples 'application/json' => {
          "error": "User Already Exist.",
        }
        run_test!
      end
    end
  end

  path '/user/sign_in' do

    post('Log an Existing User') do
      tags "Users"
      
      description "Login route"
      consumes "application/json"
      parameter name: :encounter, in: :body, schema: {
        type: :object,
        properties: {
          email: { type: :string },
          password: { type: :string },
        },
        required: ["email", "password"],
      }
      response(200, 'Successful') do
        examples 'application/json' => {
          "success": "swr5ymxs92XzoXN8ohBG",
          "pseudo": "PewPew",
        }
        run_test!
      end

      response(400, 'Bad Request') do
        examples 'application/json' => {
          "error": "Email or Password Incorrect.",
        }
        run_test!
      end
    end
  end

  path '/user/update_password' do

    delete('Update a User Password') do
      parameter name: "API", in: :header, type: :string, required: true
      tags "Users"
      description "Update a User Password"
      
      response(200, 'Successful') do
        examples 'application/json' => {
          "success": "Password Changed !",
        }
        run_test!
      end
      response(400, 'Bad Request') do
        examples 'application/json' => {
          "error": "Invalid Arguments.",
        }
        run_test!
      end
    end
  end

  path '/user/disconnect' do

    delete('Delete a user Session') do
      parameter name: "API", in: :header, type: :string, required: true
      tags "Users"
      description "Delete a User Session / Token"
      
      response(200, 'Successful') do
        examples 'application/json' => {
          "success": "User Disconnected",
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
