class AddStatsRelationToUsers < ActiveRecord::Migration[6.1]
  def change
    add_reference :users, :stats, foreign_key: true
  end
end
