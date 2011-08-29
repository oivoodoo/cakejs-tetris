require 'rake'
require 'json'
require 'versionomy'

folders = ["fonts", "images", "css", 'public']
files = ["game.html", "manifest.json"]

task :build do
  Rake::Task['build:minor'].invoke

  # compress all js files and then place into 
  # public/assets folder
  sh "jammit"

  sh "rm -rf build/ ; mkdir build"
  folders.each do |f|
    sh "cp -r #{f}/ build/"
  end
  files.each do |f|
    sh "cp #{f} build/#{f}"
  end
end

namespace :build do

  task :major do
    open_manifest do |parsed, version|
      version.major = version.major + 1
      version.minor = 0
      parsed['version'] = version.to_s
      parsed
    end
  end

  task :minor do
    open_manifest do |parsed, version|
      version.minor = version.minor + 1
      parsed['version'] = version.to_s
      parsed
    end
  end

end

def open_manifest &block
  File.open('manifest.json', "r") do |file|
    buffer = file.read
    parsed = JSON.parse(buffer)
    version = Versionomy.parse(parsed['version'])
    @content = JSON.dump(block.call(parsed, version))
  end
  File.open('manifest.json', "w").write @content
end
