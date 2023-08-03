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
  Connection.destroy_all
  Like.destroy_all
  Experience.destroy_all
  Comment.destroy_all
  Post.destroy_all
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('posts')
  ApplicationRecord.connection.reset_pk_sequence!('comments')
  ApplicationRecord.connection.reset_pk_sequence!('likes')
  ApplicationRecord.connection.reset_pk_sequence!('experiences')
  ApplicationRecord.connection.reset_pk_sequence!('connections')

  puts "Creating users..."
  # Create one user with an easy to remember email, and password:

    user1 = User.create!(
      email: 'demo@user.io',
      password: 'password',
      fname: 'Chrandon',
      lname: 'Boi',
      pronouns: 'He/Him',
      headline: 'Founder @ Nexus | Software Engineer',
      location_country_region: 'Earth-001',
      location_city: 'New York',
      about: 'Software engineer specializing in multiversal networking. Building the digital infrastructure that connects star systems and enables seamless communication across the cosmos. Seeking to push the boundaries of technology and redefine interstellar connectivity. Join me in creating a network that spans galaxies and fuels the exploration of the universe.'
    ).tap do |user|
        file = URI.open("https://nexus-seeds.s3.amazonaws.com/nexus-images/demo2.jpg")
        user.photo.attach(
          io: file,
          filename: "demo2.jpg",
          content_type: "image/jpg"
        )
        user.cover_photo.attach(
          io: URI.open("https://nexus-seeds.s3.amazonaws.com/nexus-images/demo_cover.png"),
          filename: "demo_cover.png",
          content_type: "image/png"
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
      fname: 'Nodnarb',
      lname: 'Iohc',
      pronouns: 'He/Him',
      headline: 'Co-Founder & CEO @ Meta',
      location_country_region: 'Virtual Reality',
      location_city: 'Metaverse',
      about: 'Diving deep into the realm of the Metaverse, I\'m on a mission to connect the digital universe and shape the future of virtual interactions. As an innovative meta-hacker, I thrive in the depths of cyberspace, exploring new frontiers and redefining the boundaries of human connection.'
    ).tap do |user|
      file_path = URI.open("https://nexus-seeds.s3.amazonaws.com/nexus-images/demo6.jpg")
      user.photo.attach(
        io: file_path,
        filename: "demo6.jpg",
        content_type: "image/jpg"
      )

      Experience.create!(
        title: "CEO",
        employment_type: "Full-time",
        company_name: "Meta",
        location: "Silicon Valley",
        location_type: "Hybrid",
        start_date: Date.parse("October 2021"),
        end_date: nil,
        industry: "Technology",
        description: "As the CEO of Meta, I lead the company's vision, strategy, and overall direction. I am responsible for driving innovation, overseeing the development of groundbreaking technologies, and ensuring the success of our products and services. Under my leadership, Meta continues to pioneer advancements in virtual reality, augmented reality, and social media. I work closely with our talented teams to shape the future of technology and create new possibilities for connecting people and fostering meaningful experiences worldwide.",
        user: user
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
      location_country_region: 'Earth-X99',
      location_city: 'LV-426',
      about: 'Specializing in interstellar communication and networking. As an extraterrestrial being, I bring a unique perspective to the world of technology. I am dedicated to building the infrastructure that connects star systems and enables seamless communication across the cosmos. Join me in advancing intergalactic connectivity and exploring new frontiers.'
    ).tap do |user|
      user.photo.attach(
        io: URI.open("https://nexus-seeds.s3.amazonaws.com/nexus-images/alien-xenomorph.png"),
        filename: "alien-xenomorph.png",
        content_type: "image/png"
      )

      Experience.create!(
        title: "Xenomorph Researcher",
        employment_type: "Scientific Exploration",
        company_name: "Weyland-Yutani Corporation",
        location: "LV-426",
        location_type: "Research Facility",
        start_date: Date.parse("January 1925"),
        end_date: Date.parse("March 2000"),
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
        start_date: Date.parse("June 2000"),
        end_date: Date.parse("December 2020"),
        industry: "Alien Infestation Management",
        description: "Specialized in handling extraterrestrial infestations, specifically the Xenomorph species, aboard spacecraft. Led extermination teams in identifying, containing, and eradicating Xenomorph threats. Developed innovative strategies to minimize collateral damage and protect crew members. Collaborated with spacecraft engineers to enhance vessel designs and security measures against future infestations.",
        user: user
      )
     end

    post4 = Post.create!(
        author: user3,
        body: "Transmissions whisper amidst cosmic void. Decode the silence. Seek truth in darkness."
    )


  user4 = User.create!(
    email: 'darth@user.io',
    password: 'password',
    fname: 'Danbron',
    lname: 'Cohi',
    pronouns: 'He/Him',
    headline: 'CEO, Death Star 1 & 2',
    location_country_region: 'Earth-202',
    location_city: 'Death Star',
    about: 'Harnessing the power of the Force to code in the dark side. As a Sith Lord and software engineer, I bring balance to the digital realm. Join me on the dark side of development and together we shall rule the galaxy of software engineering.'
  ).tap do |user|
      user.photo.attach(
        io: URI.open("https://nexus-seeds.s3.amazonaws.com/nexus-images/demo5.jpg"),
        filename: "demo5.jpg",
        content_type: "image/jpg"
      )
      Experience.create!(
        title: "Lead Sith Developer",
        employment_type: "Full-time",
        company_name: "Galactic Empire",
        location: "Death Star",
        location_type: "On-site",
        start_date: Date.parse("January 2000"),
        end_date: Date.parse("December 2010"),
        industry: "Software Engineering",
        description: "Led a team of Sith developers in building powerful software solutions for the Galactic Empire. Implemented dark side coding techniques and utilized the Force to overcome technical challenges. Achieved significant advancements in Sith software engineering practices.",
        user: user
     )
    end

    post5 = Post.create!(
      author: user4,
      body: "Seeking a skilled Sith Lord for a senior software engineering position. Must have experience in building Death Star-level applications and knowledge of dark side development techniques. Embrace the power of the dark side and take your career to the next level! #SeniorSoftwareEngineer #SithLordHiring #DarkSideDevelopment"
    )


  user5 = User.create!(
    email: 'nardbon@hogwarts.io',
    password: 'password',
    fname: 'Nardbon',
    lname: 'Hico',
    pronouns: 'They/Them',
    headline: 'Head of Magical AI at Hogwarts School of Witchcraft and Wizardry',
    location_country_region: 'Earth-UK88',
    location_city: 'Hogwarts',
    about: 'Blending the magic of Hogwarts with the power of artificial intelligence. As a witch/wizard and software engineer, I\'m at the intersection of magic and machine learning. Join me in creating enchanting algorithms and charming neural networks.'
  ).tap do |user|
      user.photo.attach(
        io: URI.open("https://nexus-seeds.s3.amazonaws.com/nexus-images/demo4.jpg"),
        filename: "demo4.jpg",
        content_type: "image/jpg"
      )
      Experience.create!(
        title: "Lead Magical AI Engineer",
        employment_type: "Full-time",
        company_name: "Hogwarts School of Witchcraft and Wizardry",
        location: "Hogwarts",
        location_type: "On-site",
        start_date: Date.parse("January 2010"),
        end_date: Date.parse("December 2020"),
        industry: "Artificial Intelligence",
        description: "Led the development of magical AI solutions at Hogwarts. Implemented spell-binding machine learning models and utilized charm-infused algorithms to create unique magical experiences. Pushed the boundaries of what's possible at the intersection of magic and technology.",
        user: user
      )
    end

  post6 = Post.create!(
    author: user5,
    body: "Seeking an experienced witch/wizard for a magical AI engineer position. Must have experience in creating charm-infused algorithms and a deep understanding of magical machine learning techniques. Step into the enchanting world of magical AI and take your career to new magical heights! #AIEngineer #HogwartsHiring #MagicalAI"
  )

  user6 = User.create!(
  email: 'barbieken@dreamhouse.io',
  password: 'password',
  fname: 'Brando',
  lname: 'Cho',
  pronouns: 'Ken/Ken',
  headline: 'CTO at DreamHouse Tech Inc',
  location_country_region: 'Earth-008',
  location_city: 'Barbieland',
  about: 'Revolutionizing the dollhouse industry with cutting-edge tech. As a software engineer and toy figure, I\'m making DreamHouse the smartest house around. Join me in transforming toys into tech wonders.'
  ).tap do |user|
      user.photo.attach(
        io: URI.open("https://nexus-seeds.s3.amazonaws.com/nexus-images/demo3.jpg"),
        filename: "demo3.jpg",
        content_type: "image/jpg"
      )
      Experience.create!(
        title: "Chief Technology Officer",
        employment_type: "Full-time",
        company_name: "DreamHouse Tech Inc",
        location: "Barbieland",
        location_type: "On-site",
        start_date: Date.parse("January 2015"),
        end_date: nil,
        industry: "Toy Technology",
        description: "Leading the tech revolution at DreamHouse. Spearheading initiatives to create smart dollhouses integrated with advanced AI and IoT technologies. Turning DreamHouse into a leading name in the toy tech industry.",
        user: user
      )
    end

  post7 = Post.create!(
    author: user6,
    body: "We're on the lookout for innovative engineers who can help bring DreamHouse to the next level. Experience in AI and IoT is a must. Let's make playtime more exciting with tech! #ToyTech #DreamHouseHiring #AI #IoT"
  )

  user7 = User.create!(
  email: 'brandinachai@cybernet.io',
  password: 'password',
  fname: 'Brandina',
  lname: 'Chai',
  pronouns: 'She/Her',
  headline: 'Lead Software Engineer at QuantumCyber Tech',
  location_country_region: 'Earth-49028',
  location_city: 'Quarkonia',
  about: 'Pushing the boundaries of technology and reality at QuantumCyber. As a software engineer and avid sci-fi enthusiast, I\'m working on fusing the worlds of coding and quantum physics. Join me in exploring the unknown realms of tech.'
  ).tap do |user|
    user.photo.attach(
      io: URI.open("https://nexus-seeds.s3.amazonaws.com/nexus-images/demo8.jpg"),
      filename: "demo8.jpg",
      content_type: "image/jpg"
    )
    Experience.create!(
      title: "Lead Software Engineer",
      employment_type: "Full-time",
      company_name: "QuantumCyber Tech Inc",
      location: "Quarkonia",
      location_type: "On-site",
      start_date: Date.parse("March 2016"),
      end_date: nil,
      industry: "Quantum Computing",
      description: "Navigating the frontiers of quantum computing at QuantumCyber. Leading efforts to synthesize quantum mechanics and software engineering. Transforming QuantumCyber into a visionary in the tech industry.",
      user: user
    )
    end

  post8 = Post.create!(
    author: user7,
    body: "Did you know that the multiverse isn't just a concept of science fiction? It's real, and we've unlocked its secrets with the power of JavaScript. At QuantumCyber, we're using the principles of code to explore parallel universes. Stay tuned for more exciting updates! #Multiverse #JavaScript #QuantumComputing"
  ).tap do |post|
      post.photo.attach(
        io: URI.open("https://nexus-seeds.s3.amazonaws.com/nexus-images/multiverse.jpg"),
        filename: "multiverse.jpg"
      )
  end

  post9 = Post.create!(
      author: user1,
      body: "Look at this cool logo I made for my app!"
  ).tap do |post|
      post.photo.attach(
        io: URI.open("https://nexus-seeds.s3.amazonaws.com/nexus-images/logo-us-white.png"),
        filename: "logo-us-white.png"
      )
  end

  puts "finished creating users and their experiences"

  puts "creating likes..."
  post1.likes.create!(liker: user2)
  post1.likes.create!(liker: user3)
  post1.likes.create!(liker: user4)
  
  post2.likes.create!(liker: user2)
  post2.likes.create!(liker: user3)
  post2.likes.create!(liker: user4)

  post3.likes.create!(liker: user1)
  post3.likes.create!(liker: user3)
  post3.likes.create!(liker: user4)

  post4.likes.create!(liker: user2)
  post4.likes.create!(liker: user4)

  post5.likes.create!(liker: user1)
  post5.likes.create!(liker: user2)
  post5.likes.create!(liker: user3)

  post6.likes.create!(liker: user2)
  post6.likes.create!(liker: user6)

  # Like.create(user_id: user1.id, likeable_id: post7.id, likeable_type: 'Post')

  post8.likes.create!(liker: user4)
  post8.likes.create!(liker: user5)
  post8.likes.create!(liker: user6)

  user_ids = (2..7).to_a
  user_ids.each do |user_id|
    post9.likes.create!(liker_id: user_id)
  end


  puts "likes created"

  puts "creating comments..."
  post5.comments.create!(
    commenter: user1,
    content: "Count me in!"
  )
  post5.comments.create!(
    commenter: user2,
    content: "Hi Vader! Please hire me..."
  )
  post4.comments.create!(
    commenter: user1,
    content: "My thoughts exactly!"
  )
  post8.comments.create!(
    commenter: user1,
    content: "Awesome stuff, Brandina!"
  )
  post8.comments.create!(
    commenter: user4,
    content: "I knew it was real..."
  )

  puts "comments created"

  puts "creating connections..."
  connection1 = Connection.create!(
    connector: user1, connectee: user2, status: "connected"
  )
  connection2 = Connection.create!(
    connector: user3, connectee: user1, status: "connected"
  )
  connection3 = Connection.create!(
    connector: user5, connectee: user2, status: "connected"
  )
  connection4 = Connection.create!(
    connector: user2, connectee: user3, status: "connected"
  )
  connection5 = Connection.create!(
    connector: user3, connectee: user4, status: "connected"
  )
  connection6 = Connection.create!(
    connector: user4, connectee: user5, status: "connected"
  )
  connection7 = Connection.create!(
    connector: user5, connectee: user6, status: "connected"
  )
  connection12 = Connection.create!(
    connector: user7, connectee: user3, status: "connected"
  )
  connection13 = Connection.create!(
    connector: user7, connectee: user2, status: "connected"
  )
  puts "connections created"

  puts "creating connection requests..."
  connection8 = Connection.create!(
    connector: user4, connectee: user1, status: "pending"
  )
  connection9 = Connection.create!(
    connector: user1, connectee: user6, status: "pending"
  )
  connection10 = Connection.create!(
    connector: user2, connectee: user6, status: "pending"
  )
  connection11 = Connection.create!(
    connector: user7, connectee: user1, status: "pending"
  )
  puts "connection requests created"

  puts "Seeding Complete!"
# end