class AddActualitiesRelationToUsers < ActiveRecord::Migration[6.1]
  def change
    add_reference :users, :actualities, foreign_key: true
  end
end
