<?php
namespace Deployer;

require 'recipe/common.php';

// Configuration

set('repository', 'https://imploding@github.com/imploding/site.git');
set('git_tty', true); // [Optional] Allocate tty for git on first deployment
set('shared_files', []);
set('shared_dirs', []);
set('writable_dirs', []);


// Hosts

set('default_stage', 'production');

host('139.162.78.203')
    ->stage('production')
    // ->identityFile()
    ->user('serverpilot')
    ->set('deploy_path', '/srv/users/serverpilot/apps/mthomas/public');


// Tasks

// desc('Restart PHP-FPM service');
// task('php-fpm:restart', function () {
    // The user must have rights for restart service
    // /etc/sudoers: username ALL=NOPASSWD:/bin/systemctl restart php-fpm.service
    // run('sudo systemctl restart php-fpm.service');
// });
// after('deploy:symlink', 'php-fpm:restart');

desc('Deploy your project');
task('deploy', [
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'deploy:update_code',
    'deploy:shared',
    'deploy:writable',
    'deploy:vendors',
    'deploy:clear_paths',
    'deploy:symlink',
    'deploy:unlock',
    'cleanup',
    'success'
]);

task('pwd', function () {
    $result = run('pwd');
    writeln("Current dir: $result");
});

// [Optional] if deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');