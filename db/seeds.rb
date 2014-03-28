# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

issue1 = Issue.create(title: "Indonesian Rainforests", description: "The world's forests are the most diverse habitats on the planet and play a critical role in stabilising the global climate. And yet 80% of them have been destroyed or degraded and the rest are under threat. We urgently need to put an end to the wholesale destruction of these unique and endangered habitats.", url: "https://www.greenpeace.org.au/action/?cid=64&src=GP1", lat: 3.589, lng: 97.347, status: "approved", organisation: "Greenpeace")
issue2 = Issue.create(title: "Coal Mining", description: "Open cut coal mining in the Leard State Forest will impact local farming, threatened native species and critically endangered ecological communities. Help stop coal destroying their future.", url: "https://www.greenpeace.org.au/donate/feb-appeal/?src=GP1", lat: -30.61077, lng: 150.1655090, status: "approved", organisation: "Greenpeace")
issue3 = Issue.create(title: "Save The Arctic", description: "In the last 30 years, we’ve lost as much as three-quarters of the floating sea ice cover at the top of the world. The volume of that sea ice measured by satellites in the summer, when it reaches its smallest, has shrunk so fast that scientists say it’s now in a ‘death spiral’.", url: "http://www.savethearctic.org", lat: -30.61077, lng: 150.1655090, status: "approved", organisation: "Greenpeace")
