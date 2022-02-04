require 'bcrypt'

class User < ApplicationRecord
  belongs_to :actualities, optional: true
  has_many :stats
  has_many :messages
  acts_as_token_authenticatable
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  devise :omniauthable, omniauth_providers: [:facebook]
    include BCrypt

    # def password
    #     @password ||= Password.new(password_hash)
    # end

    # def password=(new_password)
    #     @password = Password.create(new_password)
    #     self.password_hash = @password
    # end
end
