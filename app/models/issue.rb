class Issue < ActiveRecord::Base
	validates :title, presence: true
	validates :description, presence: true
	validates :url, presence: true
	validates :organisation, presence: true
	validates :lat, presence: { message: "You must place a marker on the map" }
	belongs_to :user 
end
