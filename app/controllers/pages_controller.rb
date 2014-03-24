class PagesController < ApplicationController
	before_filter :authenticate_user!, except: [:index]
	
	def index
		gon.markers = Marker.all
	end

	def create
	end
end
