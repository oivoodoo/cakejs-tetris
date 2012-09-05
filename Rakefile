require 'rake'
require 'json'
require 'versionomy'

folders = ['public']
files = ["game.html", "manifest.json"]

task :build do
  Rake::Task['build:minor'].invoke

  # compress all js files and then place into
  # public/assets folder
  sh "jammit"

  sh "rm -rf build/ ; mkdir build"
  sh "rm -rf bin/ ; mkdir bin"

  sh "cp public/game.html ."

  page = File.read('game.html')
  page.gsub!(/\/assets/, 'public/assets')
  page.gsub!(/\/assets\/css/, '/css')

  File.open('game.html', 'w') do |file|
    file.write(page)
  end

  styles = File.read('public/assets/css/styles.css')

  styles.gsub!(/url\(\'/, "url('..")
  File.open('public/css/styles.css', 'w') do |file|
    file.write(styles)
  end

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
