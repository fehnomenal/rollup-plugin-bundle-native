{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    devenv = {
      url = "github:cachix/devenv";
      inputs = {
        nixpkgs.follows = "nixpkgs";
      };
    };
  };

  outputs = inputs@{ self, nixpkgs, flake-parts, devenv, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [
        devenv.flakeModule
      ];

      systems = [
        "x86_64-linux"
      ];

      perSystem = { options, config, self', inputs', lib, pkgs, system, specialArgs }: {
        devenv.shells.default = {
          packages = [
            pkgs.nodejs
            pkgs.nodejs.pkgs.pnpm
          ];
        };
      };
    };
}
