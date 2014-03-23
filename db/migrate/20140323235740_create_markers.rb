class CreateMarkers < ActiveRecord::Migration
  def change
    create_table :markers do |t|
      t.string :title
      t.text :description
      t.string :url
      t.decimal :latlng
      t.string :status
      t.string :organisation

      t.timestamps
    end
  end
end
