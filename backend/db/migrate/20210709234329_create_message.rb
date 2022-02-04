class CreateMessage < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.string :value
      # add_reference :forums
      t.timestamps
    end
  end
end
