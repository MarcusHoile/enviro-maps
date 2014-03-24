json.array!(@issues) do |issue|
  json.extract! issue, :id, :title, :description, :url, :lat, :lng, :status, :organisation
  json.url issue_url(issue, format: :json)
end
