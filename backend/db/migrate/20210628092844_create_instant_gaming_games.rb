class CreateInstantGamingGames < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      t.string :name
      t.string :price
      t.string :link
      t.string :imglink
      t.string :promo
      t.timestamps
    end
  end
end
