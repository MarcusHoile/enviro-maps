class Asset < ActiveRecord::Base
  belongs_to :issue
  has_attached_file :image, styles: { medium: " 300x300>", thumb: "100x100>" }
  validates_attachment_content_type :image, :content_type => ["image/jpg", "image/jpeg", "image/png"]
end