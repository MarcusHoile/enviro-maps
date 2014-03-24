class ChangeLatlngDatatypeInMarkers < ActiveRecord::Migration
  def change
  	remove_column :markers, :latlng
  	add_column :markers, :lat, :decimal
  	add_column :markers, :lng, :decimal
  end
end
