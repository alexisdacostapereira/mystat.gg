class CreateStats < ActiveRecord::Migration[6.1]
  def change
    create_table :stats do |t|
      t.string :pseudo
      t.string :game
      t.string :server
      t.belongs_to :users
      t.string :plateform
      t.timestamps
    end
  end
end
