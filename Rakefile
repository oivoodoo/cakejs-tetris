require 'rake'

folders = ["fonts", "images", "css"]
files = ["game.html", "manifest.json"]

task :build do
  sh "rm -rf build/ ; mkdir build"
  folders.each do |f|
    sh "cp -r #{f}/ build/"
  end
  files.each do |f|
    sh "cp #{f} build/#{f}"
  end
end
