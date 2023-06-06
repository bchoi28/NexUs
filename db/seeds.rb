require "open-uri"


# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all
  Post.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."
  # Create one user with an easy to remember email, and password:
  User.create!(
    email: 'demo@user.io', 
    password: 'password',
    fname: 'Melon',
    lname: 'Usk',
    pronouns: 'He/Him',
    headline: 'Founder @ Nexus | Software Engineer | Physical Therapist',
    location_country_region: 'USA',
    location_city: 'New York',
    about: 'Software engineer specializing in intergalactic networking. Building the digital infrastructure that connects star systems and enables seamless communication across the cosmos. Seeking to push the boundaries of technology and redefine interstellar connectivity. Join me in creating a network that spans galaxies and fuels the exploration of the universe.'
    )
    
    # .tap do |user|
    #   user.photo.attach(
    #     io: 
    #     filename:
    #     content_type:
    #   )
    # end

  # User.create!(
  #   email: 'zark@user.io',
  #   password: 'password',
  #   fname: 'Zark',
  #   lname: 'Muckerberg',
  #   pronouns: 'He/Him',
  #   headline: 'Meta-Hacker | Robot',
  #   location_country_region: 'Virtual Reality',
  #   location_city: 'Metaverse',
  #   about: 'Diving deep into the realm of the Metaverse, I\'m on a mission to connect the digital universe and shape the future of virtual interactions. As an innovative meta-hacker, I thrive in the depths of cyberspace, exploring new frontiers and redefining the boundaries of human connection.'
  # ).tap do |user|
  #   user.photo.attach(
  #     io: 
  #     filename:
  #     content_type:
  #   )
  # end

  # User.create!(
  #   email: 'alien@user.io',
  #   password: 'password',
  #   fname: 'Alien',
  #   lname: 'Xenomorph',
  #   pronouns: 'It',
  #   headline: 'Intergalactic Network Engineer',
  #   location_country_region: 'Extraterrestrial',
  #   location_city: 'LV-426',
  #   about: 'Specializing in interstellar communication and networking. As an extraterrestrial being, I bring a unique perspective to the world of technology. I am dedicated to building the infrastructure that connects star systems and enables seamless communication across the cosmos. Join me in advancing intergalactic connectivity and exploring new frontiers.'
  # ).tap do |user|
  #   user.photo.attach(
  #     io: 
  #     filename:
  #     content_type:
  #   )
  # end

  # User.create!(
  #   email: 'mercury@user.io',
  #   password: 'password',
  #   fname: 'Mercury',
  #   lname: 'Retrograde',
  #   pronouns: 'They/Them',
  #   headline: 'Cosmic Communication Specialist',
  #   location_country_region: 'Universe',
  #   location_city: 'Celestial Realm',
  #   about: 'Embracing the cosmic vibes and the occasional retrograde. I specialize in navigating the challenges of celestial communication and ensuring smooth interstellar connections. Let\'s transcend the astrological barriers and create a harmonious network that spans the galaxies.'
  # ).tap do |user|
  #   user.photo.attach(
  #     io: 
  #     filename:
  #     content_type:
  #   )
  # end

  # User.create!(
  #   email: 'darth@user.io',
  #   password: 'password',
  #   fname: 'Darth',
  #   lname: 'Vader',
  #   pronouns: 'He/Him',
  #   headline: 'Dark Side Developer',
  #   location_country_region: 'Galactic Empire',
  #   location_city: 'Death Star',
  #   about: 'Harnessing the power of the Force to code in the dark side. As a Sith Lord and software engineer, I bring balance to the digital realm. Join me on the dark side of development and together we shall rule the galaxy of software engineering.'
  # ).tap do |user|
  #   user.photo.attach(
  #     io: 
  #     filename:
  #     content_type:
  #   )
  # end





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
# end