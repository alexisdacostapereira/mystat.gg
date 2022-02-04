class Message < ApplicationRecord
    belongs_to :forums
    belongs_to :users
end
