class MarkersController < ApplicationController
	before_filter :authenticate_user!, except: [:index]
	def index
		gon.markers = Marker.all
		gon.marker = Marker.first
	end

	def create
	end
end
