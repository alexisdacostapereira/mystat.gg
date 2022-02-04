class AddColumnsToActualityTable < ActiveRecord::Migration[6.1]
  def change
    add_column :actualities, :callOfDutyActu, :boolean
    add_column :actualities, :diablo2Actu, :boolean
    add_column :actualities, :dota2Actu, :boolean
    add_column :actualities, :dbzActu, :boolean
    add_column :actualities, :fortniteActu, :boolean
    add_column :actualities, :legendsOfRuneterraActu, :boolean
    add_column :actualities, :marioKartActu, :boolean
    add_column :actualities, :overwatchActu, :boolean
    add_column :actualities, :pubgActu, :boolean
    add_column :actualities, :rainbowSixActu, :boolean
    add_column :actualities, :smashBrosUltimateActu, :boolean
    add_column :actualities, :starcraft2Actu, :boolean
    add_column :actualities, :streetFighterVActu, :boolean
    add_column :actualities, :teamfightTacticsActu, :boolean
    add_column :actualities, :tekken7Actu, :boolean
    add_column :actualities, :trackmaniaActu, :boolean
    add_column :actualities, :warcraft3Actu, :boolean
    add_column :actualities, :wowActu, :boolean
  end
end
