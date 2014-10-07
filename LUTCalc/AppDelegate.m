//
//  AppDelegate.m
//  LUTCalc
//
//  Created by Ben Turley on 04/10/2014.
//  Copyright (c) 2014 Ben Turley. All rights reserved.
//

#import "AppDelegate.h"

@interface AppDelegate ()

@property (weak) IBOutlet NSWindow *window;
@property (assign) IBOutlet WebView *webView;
@end

@implementation AppDelegate

//- (void)applicationDidFinishLaunching:(NSNotification *)aNotification {
//    NSURL *url = [[NSBundle mainBundle] URLForResource:@"web/index" withExtension:@"html"];
//    NSURLRequest *urlRequest = [NSURLRequest requestWithURL:url];
//    [[[self webView] mainFrame] loadRequest:urlRequest];
//    [self.window setContentView:self.webView];
//    [self.window setTitle:@"LUTCalc"];
//    NSLog(@"here we go");
//}

- (void) awakeFromNib {
    [NSApp setDelegate: self];
    [[self webView] setUIDelegate: self];
    [[self webView] setResourceLoadDelegate: self];
    [[self webView] setFrameLoadDelegate:self];
    NSURL *url = [[NSBundle mainBundle] URLForResource:@"web/index" withExtension:@"html"];
    NSURLRequest *urlRequest = [NSURLRequest requestWithURL:url];
    [[[self webView] mainFrame] loadRequest:urlRequest];
    [self.window setContentView:self.webView];
    [self.window setTitle:@"LUTCalc"];
    [[NSUserNotificationCenter defaultUserNotificationCenter] setDelegate:(id)self];
}

- (void) webView:(WebView *)sender didClearWindowObject:(WebScriptObject *)windowObject forFrame:(WebFrame *)frame {
    id win = [sender windowScriptObject];
    [win setValue:self forKey:@"lutCalcApp"];
    [win setValue:self forKey:@"appOS"];
    [win setValue:self forKey:@"saveLUT"];
}

- (BOOL)userNotificationCenter:(NSUserNotificationCenter *)center shouldPresentNotification:(NSUserNotification *)notification{
    return YES;
}

- (BOOL)applicationShouldTerminateAfterLastWindowClosed:(NSApplication *)theApplication {
    return YES;
}

// Set which methods can interact with Javascript and how

+ (BOOL)isSelectorExcludedFromWebScript:(SEL)selector {
    NSLog(@"%@ received %@ for '%@'", self, NSStringFromSelector(_cmd), NSStringFromSelector(selector));
    if (selector == @selector(saveLUTToFile:withFileName:withFileExtension:)) {
        return NO;
    } else if (selector == @selector(appOS)) {
        return NO;
    }
    return YES;
}

+ (BOOL)isKeyExcludedFromWebScript:(const char *)property {
    NSLog(@"%@ received %@ for '%s'", self, NSStringFromSelector(_cmd), property);
    //    if (strcmp(property, "sharedValue") == 0) {
    //       return NO;
    //    }
    return YES;
}

+ (NSString *) webScriptNameForSelector:(SEL)sel {
    NSLog(@"%@ received %@ with sel='%@'", self, NSStringFromSelector(_cmd), NSStringFromSelector(sel));
    if (sel == @selector(saveLUTToFile:withFileName:withFileExtension:)) {
        return @"saveLUT";
    } else if (sel == @selector(appOS)) {
        return @"appOS";
    } else {
        return nil;
    }
}

// Methods that interact with the Javascript
- (NSString *) appOS {
    return @"osx";
}
- (BOOL) saveLUTToFile:(NSString *)lutContent withFileName:(NSString *)fileName withFileExtension:(NSString*) fileExtension; {
    __block BOOL succeeded = NO;
    NSString* newName = [[fileName stringByDeletingPathExtension]
                         stringByAppendingPathExtension:fileExtension];
    // Set the default name for the file and show the panel.
    NSSavePanel*    panel = [NSSavePanel savePanel];
    [panel setNameFieldStringValue:newName];
    [panel beginSheetModalForWindow:self.window completionHandler:^(NSInteger result){
        if (result == NSFileHandlingPanelOKButton)
        {
            NSURL*  fileURL = [panel URL];
            NSError* error;
            BOOL savedOK = [lutContent writeToURL:fileURL
                                     atomically:YES
                                       encoding:NSUTF8StringEncoding
                                            error:&error];
            if (! savedOK) {
                NSLog(@"writeUsingSavePanel failed - %@",[error localizedFailureReason]);
            } else {
                NSUserNotification *userNotification = [[NSUserNotification alloc] init];
                userNotification.title = [NSString stringWithFormat: @"%@ Cube LUT", fileName];
                userNotification.subtitle = @"Saved Successfully";
                [[NSUserNotificationCenter defaultUserNotificationCenter] deliverNotification:userNotification];
 
                succeeded = YES;
            }
        }
    }];
    return succeeded;
}


@end
