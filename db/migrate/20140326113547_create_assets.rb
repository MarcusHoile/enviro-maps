class CreateAssets < ActiveRecord::Migration
  def change
    create_table :assets do |t|
      t.references :issue, index: true

      t.timestamps
    end
  end
end
