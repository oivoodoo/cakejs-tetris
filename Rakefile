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
  sh "rm -rf bin/ ; mkdir bin"

  folders.each do |f|
    sh "cp -r #{f}/ build/#{f}"
  end
  files.each do |f|
    sh "cp #{f} build/#{f}"
  end

  sh "rm -rf build/public/assets/*.gz"
  sh "zip -r build.zip build/"
  sh "mv build.zip bin/"
  sh "rm -rf build/"
end

namespace :build do

  task :major do
    open_manifest do |parsed, version|
      parsed['version'] = "#{version.major + 1}.0"
    end
  end

  task :minor do
    open_manifest do |parsed, version|
      parsed['version'] = "#{version.major}.#{version.minor + 1}"
    end
  end

end

def open_manifest
  File.open('manifest.json', "r") do |file|
    buffer = file.read
    parsed = JSON.parse(buffer)
    version = Versionomy.parse(parsed['version'])

    yield parsed, version

    @content = JSON.dump(parsed)
  end

  File.open('manifest.json', "w") do |file|
    file.write(@content)
  end
end
