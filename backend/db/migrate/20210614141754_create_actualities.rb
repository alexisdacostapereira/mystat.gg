class CreateActualities < ActiveRecord::Migration[6.1]
  def change
    create_table :actualities do |t|
      t.boolean :lolActu
      t.boolean :valorantActu
      t.boolean :rocketLeagueActu
      t.boolean :csGoActu
      t.boolean :apexActu

      t.timestamps
    end
  end
end
