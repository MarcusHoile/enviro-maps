class Issue < ActiveRecord::Base
	belongs_to :user 
	has_many :assets
  acts_as_taggable # Alias for acts_as_taggable_on :tags
  acts_as_taggable_on :tag

	
	validates :title, presence: true
	validates :description, presence: true
	validates :url, presence: true
	validates :organisation, presence: true
	validates :lat, presence: { message: "You must place a marker on the map" }

end
