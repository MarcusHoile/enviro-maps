class IssuesController < ApplicationController
	before_filter :authenticate_user!, except: [:index]
	
	def index
		gon.issues = Issue.all
		gon.issue = Issue.first
	end

	def create
	end

end
