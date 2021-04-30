interface IScreen {

  // Initializes the screen
  initializeScreen(screen: any): void;

  // Uninitializes the screen
  uninitializeScreen(): void;
}

export default IScreen;