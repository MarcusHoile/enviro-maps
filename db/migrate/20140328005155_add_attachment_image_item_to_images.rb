class AddAttachmentImageItemToImages < ActiveRecord::Migration
  def self.up
    change_table :images do |t|
      t.attachment :image_item
    end
  end

  def self.down
    drop_attached_file :images, :image_item
  end
end
