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
  ApplicationRecord.connection.reset_pk_sequence!('posts')

  puts "Creating users..."
  # Create one user with an easy to remember email, and password:

    user1 = User.create!(
      email: 'demo@user.io',
      password: 'password',
      fname: 'Chrandon',
      lname: 'Boi',
      pronouns: 'He/Him',
      headline: 'Founder @ Nexus | Software Engineer',
      location_country_region: 'USA',
      location_city: 'New York',
      about: 'Software engineer specializing in multiversal networking. Building the digital infrastructure that connects star systems and enables seamless communication across the cosmos. Seeking to push the boundaries of technology and redefine interstellar connectivity. Join me in creating a network that spans galaxies and fuels the exploration of the universe.'
    ).tap do |user|
        file = File.open("frontend/public/assets/images/seeds/melon-usk-circle.png")
        user.photo.attach(
          io: file,
          filename: "melon-usk-circle.png"
      )
      puts "demo-user created"

      Experience.create!(
        title: "Senior Software Engineer",
        employment_type: "Full-time",
        company_name: "Nexus Technologies",
        location: "New York",
        location_type: "Remote",
        start_date: Date.parse("January 2020"),
        end_date: nil,
        industry: "Technology",
        description: "Lead a team of software engineers in developing interstellar networking solutions. Designed and implemented scalable systems for connecting star systems across the universe. Collaborated with cross-functional teams to ensure seamless communication and data exchange. Pioneered new technologies to push the boundaries of intergalactic connectivity.",
        user: user
       )
      Experience.create!(
        title: "Physical Therapist",
        employment_type: "Full-time",
        company_name: "Galactic Rehabilitation Center",
        location: "New York",
        location_type: "On-site",
        start_date: Date.parse("June 2015"),
        end_date: Date.parse("December 2019"),
        industry: "Healthcare",
        description: "Provided rehabilitative care to interstellar travelers and beings from various star systems. Developed personalized treatment plans to aid in recovery and improve physical well-being. Collaborated with multidisciplinary teams to optimize patient outcomes. Conducted research on advanced therapeutic techniques in zero-gravity environments.",
        user: user
      )

      puts 'demo experiences created'
    end

    post1 = Post.create!(
      author: user1,
      body: "Attention space enthusiasts and cosmic coders! Exciting interstellar job opportunities await. Join the ranks of intergalactic pioneers and shape the future of technology across the universe. Let's connect the stars through code and embark on an extraordinary journey together. #JobOpportunities #InterstellarTech"
    )

    post2 = Post.create!(
      author: user1,
      body: "Did you know? 92% of time travel breakthroughs are fueled by coding. As software engineers, we hold the keys to unlock temporal possibilities and shape the fabric of reality. Join the coding revolution and pave the way to new temporal horizons. #TimeTravel #Coding"
    ).tap do |post|
        post.photo.attach(
          io: URI.open("https://nexus-seeds.s3.amazonaws.com/nexus-images/time-travel.png"),
          filename: "time-travel.png"
        )
    end

    puts 'demo-user posts created'

    user2 = User.create!(
      email: 'zark@user.io',
      password: 'password',
      fname: 'Zark',
      lname: 'Muckerberg',
      pronouns: 'He/Him',
      headline: 'Meta-Hacker | Robot',
      location_country_region: 'Virtual Reality',
      location_city: 'Metaverse',
      about: 'Diving deep into the realm of the Metaverse, I\'m on a mission to connect the digital universe and shape the future of virtual interactions. As an innovative meta-hacker, I thrive in the depths of cyberspace, exploring new frontiers and redefining the boundaries of human connection.'
    ).tap do |user|
      file_path = "frontend/public/assets/images/seeds/zark-muckerberg.png"
      user.photo.attach(
        io: File.open(file_path),
        filename: "zark-muckerberg.png"
      )
    end

    post3 = Post.create!(
      author: user2,
      body: "Exciting times in the Metaverse! Unleashing the power of virtuality. Connect, code, and transcend."
    ).tap do |post|
      post.photo.attach(
        io: URI.open("https://nexus-seeds.s3.amazonaws.com/nexus-images/metaverse.png"),
        filename: "metaverse.png"
      )
    end
    

    user3 = User.create!(
      email: 'alien@user.io',
      password: 'password',
      fname: 'Alien',
      lname: 'Xenomorph',
      pronouns: 'It',
      headline: 'Intergalactic Network Engineer',
      location_country_region: 'Extraterrestrial',
      location_city: 'LV-426',
      about: 'Specializing in interstellar communication and networking. As an extraterrestrial being, I bring a unique perspective to the world of technology. I am dedicated to building the infrastructure that connects star systems and enables seamless communication across the cosmos. Join me in advancing intergalactic connectivity and exploring new frontiers.'
    ).tap do |user|
      user.photo.attach(
        io: URI.open("https://nexus-seeds.s3.amazonaws.com/nexus-images/alien-xenomorph.png"),
        filename: "alien-xenomorph.png"
      )

      Experience.create!(
        title: "Xenomorph Researcher",
        employment_type: "Scientific Exploration",
        company_name: "Weyland-Yutani Corporation",
        location: "LV-426",
        location_type: "Research Facility",
        start_date: Date.parse("January 1550"),
        end_date: Date.parse("March 1600"),
        industry: "Extraterrestrial Biology",
        description: "Engaged in groundbreaking research on the Xenomorph species for the Weyland-Yutani Corporation. Conducted extensive studies to unravel the mysterious life cycle, behavior, and genetic makeup of the species. Analyzed their unique adaptation capabilities and developed advanced containment protocols. Contributed to the corporation's pursuit of harnessing the Xenomorph's potential for commercial and scientific applications.",
        user: user
      )

      Experience.create!(
        title: "Spacecraft Infestation Specialist",
        employment_type: "Intergalactic Pest Control",
        company_name: "United Galactic Exterminators",
        location: "Various Spacecraft",
        location_type: "Interstellar",
        start_date: Date.parse("June 2175"),
        end_date: Date.parse("December 2180"),
        industry: "Alien Infestation Management",
        description: "Specialized in handling extraterrestrial infestations, specifically the Xenomorph species, aboard spacecraft. Led extermination teams in identifying, containing, and eradicating Xenomorph threats. Developed innovative strategies to minimize collateral damage and protect crew members. Collaborated with spacecraft engineers to enhance vessel designs and security measures against future infestations.",
        user: user
      )
     end

    post4 = Post.create!(
        author: user3,
        body: "Transmissions whisper amidst cosmic void. Decode the silence. Seek truth in darkness."
    )


#   User.create!(
#   email: 'predator@user.io',
#   password: 'password',
#   fname: 'Predator',
#   lname: 'Yautja',
#   pronouns: 'They/Them',
#   headline: 'Honorable Hunter from Yautja Prime',
#   location_country_region: 'Outer Space',
#   location_city: 'Predator Ship',
#   about: 'As a Yautja warrior hailing from the distant planet of Yautja Prime, I am an experienced hunter seeking worthy prey across the universe. Armed with advanced technology and unmatched physical prowess, I have honed my skills over countless hunts. Embracing the Yautja code of honor, I uphold a strict moral compass and respect for formidable adversaries. Join me in the pursuit of worthy challenges and the preservation of Yautja traditions.'
# ).tap do |user|
#   user.photo.attach(
#     io: File.open('path/to/predator_photo.jpg'), # Provide the path to the Predator's photo
#     filename: 'predator_photo.jpg',
#     content_type: 'image/jpeg' # Adjust the content type based on the actual file type
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

  user4 = User.create!(
    email: 'darth@user.io',
    password: 'password',
    fname: 'Darth',
    lname: 'Vader, Lord',
    pronouns: 'He/Him',
    headline: 'CEO, Death Star 1 & 2',
    location_country_region: 'Galactic Empire',
    location_city: 'Death Star',
    about: 'Harnessing the power of the Force to code in the dark side. As a Sith Lord and software engineer, I bring balance to the digital realm. Join me on the dark side of development and together we shall rule the galaxy of software engineering.'
  ).tap do |user|
      user.photo.attach(
        io: URI.open("https://nexus-seeds.s3.amazonaws.com/nexus-images/darth-vader.png"),
        filename: "darth-vader.png"
      )
      Experience.create!(
        title: "Lead Sith Developer",
        employment_type: "Full-time",
        company_name: "Galactic Empire",
        location: "Death Star",
        location_type: "Office",
        start_date: Date.new(2000, 1, 1),
        end_date: Date.new(2010, 12, 31),
        industry: "Software Engineering",
        description: "Led a team of Sith developers in building powerful software solutions for the Galactic Empire. Implemented dark side coding techniques and utilized the Force to overcome technical challenges. Achieved significant advancements in Sith software engineering practices.",
        user: user
     )
    end

    post5 = Post.create!(
      author: user4,
      body: "Seeking a skilled Sith Lord for a senior software engineering position. Must have experience in building Death Star-level applications and knowledge of dark side development techniques. Embrace the power of the dark side and take your career to the next level! #SeniorSoftwareEngineer #SithLordHiring #DarkSideDevelopment"
    )

# User.create!(
#   email: 'babygroot@user.io',
#   password: 'password',
#   fname: 'Baby',
#   lname: 'Groot',
#   pronouns: 'He/Him',
#   headline: 'Adventurous Sapling from Outer Space',
#   location_country_region: 'Galaxy',
#   location_city: 'Knowhere',
#   about: 'I am Baby Groot, a lovable and adventurous sapling hailing from the cosmos. Despite my small size, I possess immense courage and a special connection with nature. Join me on cosmic journeys as I dance to the beats of the galaxy, spreading joy and defeating villains with my friends from the Guardians of the Galaxy.'
# ).tap do |user|
#   user.photo.attach(
#     io: File.open('path/to/baby_groot_photo.jpg'), # Provide the path to Baby Groot's photo
#     filename: 'baby_groot_photo.jpg',
#     content_type: 'image/jpeg' # Adjust the content type based on the actual file type
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

  # Post.create!(
  #   author_id: 1,
  #   body: "Attention cosmic graduates! I have successfully completed my Intergalactic Academy training, and now I'm ready to embark on my cosmic coding journey. Seeking interstellar opportunities to apply my skills and contribute to groundbreaking space projects. Let's take coding to new frontiers!"
  # )

  # Post.create!(
  #   author_id: 1,
  #   body: "Calling all interstellar job seekers! I'm on the lookout for an out-of-this-world career opportunity. With my stellar skills in space engineering and cosmic problem-solving, I'm ready to make an impact. Reach out if you have any cosmic job openings or if you're interested in intergalactic talent!"
  # )

  # Post.create!(
  #   author_id: 1,
  #   body: "Greetings space explorers! Just discovered a fascinating application of JavaScript in intergalactic travel. By harnessing the power of this universal language, we can optimize spacecraft navigation, calculate warp speeds, and simulate celestial phenomena. Let's dive into the wonders of JavaScript in the cosmic realm!"
  # )


  post1.likes.create!(liker: user2)
  post1.likes.create!(liker: user3)
  post1.likes.create!(liker: user4)
  
  post2.likes.create!(liker: user2)
  post2.likes.create!(liker: user3)
  post2.likes.create!(liker: user4)

  post3.likes.create!(liker: user1)
  post3.likes.create!(liker: user3)
  post3.likes.create!(liker: user4)

  post4.likes.create!(liker: user1)
  post4.likes.create!(liker: user2)
  post4.likes.create!(liker: user4)

  post5.likes.create!(liker: user1)
  post5.likes.create!(liker: user2)
  post5.likes.create!(liker: user3)
  post5.comments.create!(
    commenter: user1,
    content: "Count me in!"
  )


  puts "Done!"
# end