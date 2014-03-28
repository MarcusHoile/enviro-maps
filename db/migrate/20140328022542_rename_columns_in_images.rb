class RenameColumnsInImages < ActiveRecord::Migration
  def change
  	remove_column :images, :image_item_file_name
  	remove_column :images, :image_item_content_type
  	remove_column :images, :image_item_file_size
  	remove_column :images, :image_item_updated_at
  	add_column :images, :image_item, :string
  end
end
