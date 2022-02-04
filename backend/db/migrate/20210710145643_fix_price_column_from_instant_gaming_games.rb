class FixPriceColumnFromInstantGamingGames < ActiveRecord::Migration[6.1]
  def change
    change_column :games, :price, :float
  end
end
