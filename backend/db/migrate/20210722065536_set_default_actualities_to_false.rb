class SetDefaultActualitiesToFalse < ActiveRecord::Migration[6.1]
  def change
    change_column :actualities, :lolActu, :boolean, default: true
    change_column :actualities, :valorantActu, :boolean, default: false
    change_column :actualities, :rocketLeagueActu, :boolean, default: false
    change_column :actualities, :csGoActu, :boolean, default: false
    change_column :actualities, :apexActu, :boolean, default: false
    change_column :actualities, :callOfDutyActu, :boolean, default: false
    change_column :actualities, :diablo2Actu, :boolean, default: false
    change_column :actualities, :dota2Actu, :boolean, default: false
    change_column :actualities, :dbzActu, :boolean, default: false
    change_column :actualities, :fortniteActu, :boolean, default: false
    change_column :actualities, :legendsOfRuneterraActu, :boolean, default: false
    change_column :actualities, :marioKartActu, :boolean, default: false
    change_column :actualities, :overwatchActu, :boolean, default: true
    change_column :actualities, :pubgActu, :boolean, default: true
    change_column :actualities, :rainbowSixActu, :boolean, default: false
    change_column :actualities, :smashBrosUltimateActu, :boolean, default: false
    change_column :actualities, :starcraft2Actu, :boolean, default: false
    change_column :actualities, :streetFighterVActu, :boolean, default: false
    change_column :actualities, :teamfightTacticsActu, :boolean, default: false
    change_column :actualities, :tekken7Actu, :boolean, default: false
    change_column :actualities, :trackmaniaActu, :boolean, default: false
    change_column :actualities, :warcraft3Actu, :boolean, default: false
    change_column :actualities, :wowActu, :boolean, default: false
  end
end
