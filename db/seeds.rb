# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."
  # Create one user with an easy to remember email, and password:
  User.create!(
    email: 'demo@user.io', 
    password: 'password',
    fname: 'demo',
    lname: 'user',
    image_url: '/Users/brandonchoi/Desktop/aA_projects/fs_project/NexUs/frontend/public/images/default-profile-image-circle.png',
    pronouns: 'He/Him',
    location_country_region: 'USA',
    location_city: 'New York'
  )

#   # More users
#   10.times do 
#     User.create!({
#       username: Faker::Internet.unique.username(specifier: 3),
#       email: Faker::Internet.unique.email,
#       password: 'password'
#     }) 
#   end

  Post.create!(
    author_id: 1,
    body: "Attention cosmic graduates! I have successfully completed my Intergalactic Academy training, and now I'm ready to embark on my cosmic coding journey. Seeking interstellar opportunities to apply my skills and contribute to groundbreaking space projects. Let's take coding to new frontiers!"
  )

  Post.create!(
    author_id: 1,
    body: "Calling all interstellar job seekers! I'm on the lookout for an out-of-this-world career opportunity. With my stellar skills in space engineering and cosmic problem-solving, I'm ready to make an impact. Reach out if you have any cosmic job openings or if you're interested in intergalactic talent!"
  )

  Post.create!(
    author_id: 1,
    body: "Greetings space explorers! Just discovered a fascinating application of JavaScript in intergalactic travel. By harnessing the power of this universal language, we can optimize spacecraft navigation, calculate warp speeds, and simulate celestial phenomena. Let's dive into the wonders of JavaScript in the cosmic realm!"
  )


  puts "Done!"
end