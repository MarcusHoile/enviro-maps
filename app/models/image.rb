class Image < ActiveRecord::Base
  belongs_to :issue
  # has_attached_file :image_item, styles: { medium: " 300x300>", thumb: "100x100>" }
  # validates_attachment_content_type :image_item, :content_type => ["image/jpg", "image/jpeg", "image/png"]
  mount_uploader :image_item, ImageUploader
  def upload_url
  	self.image_item_url
  end
end
