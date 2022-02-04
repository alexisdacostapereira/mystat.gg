class CreateForum < ActiveRecord::Migration[6.1]
  def change
    create_table :forums do |t|
      t.string :game
      t.timestamps
    end
  end
end
